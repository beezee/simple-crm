import { UserCreateCodec, UserUpdateCodec } from './codecs';
import * as t from 'io-ts';

export type UserCreateData = t.TypeOf<typeof UserCreateCodec>;
export type UserUpdateData = t.TypeOf<typeof UserUpdateCodec>;
