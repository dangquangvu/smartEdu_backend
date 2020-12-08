import * as mongoose from 'mongoose';
export function getStringEnumValues<E extends Record<keyof E, string>>(
  e: E,
): E[keyof E][] {
  return (Object.keys(e) as (keyof E)[]).map(k => e[k]);
}

export function checkObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export function isVideo(filename) {
  let ext = this.getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'avi':
    case 'mpg':
    case 'mp4':
      // etc
      return true;
  }
  return false;
}

export function getExtension(filename) {
  let parts = filename.split('.');
  return parts[parts.length - 1];
}

export function convertName(dir: string) {
  const arr = dir.split('/');
  return arr[arr.length - 1];
}
