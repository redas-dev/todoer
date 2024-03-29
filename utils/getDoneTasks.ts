import {UserData} from '../types/userData';

export function getDoneTasks(groupId: string, data: UserData) {
  let done = 0;
  try {
    const index = data.groups.findIndex(group => {
      return group.id === groupId;
    });
    data.groups[index].tasks.forEach(task => {
      if (task.isDone && !task.repeating) done++;
    });
  } catch (e) {
    console.log(e);
  }
  return done;
}
