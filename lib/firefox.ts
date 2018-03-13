import {
  OptErrorPlace,
  buildErrorFromJsonAndPosition
} from './helper';

export const extractErrorPositionFromErrorMsg = (msg: string): OptErrorPlace => {
  const res = /at line (\d+) column (\d+)/.exec(msg);
  return res
    ? {
        l: parseInt(res[1], 10) - 1,
        c: parseInt(res[2], 10) - 1
      }
    : null;
}

export const showFancySyntaxException = (rawJson: string, e: SyntaxError): string => {
  const context: Array<string> = [ e.message ];
  const position = extractErrorPositionFromErrorMsg(e.message);
  return position
    ? buildErrorFromJsonAndPosition(rawJson.split('\n'), context, position)
    : "";
}

export const safeJsonParse = <A>(raw: string): A => {
  try {
    return JSON.parse(raw);
  } catch (e) {
    throw new SyntaxError(showFancySyntaxException(raw, e));
  }
}
