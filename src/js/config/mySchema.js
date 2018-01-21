import { schema } from 'normalizr';

export const owner = new schema.Entity('owners');
export const club = new schema.Entity('clubs');
export const member = new schema.Entity('members');
export const checkin = new schema.Entity('checkins');

owner.define({
  clubs: [club],
});

club.define({
  members: [member],
  owner: owner,
});

member.define({
  checkins: [checkin],
  club: club,
});

checkin.define({
  member: member,
});