export interface Profile {
  info: {type: string, empty: true, required: false};
  fname: {type: string, empty: false, required: true};
  lname: {type: string, empty: false, required: true};

}