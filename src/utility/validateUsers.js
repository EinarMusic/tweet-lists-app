import Axios from "axios";
import { environment } from "../environments/environments.js";

import { ref, unref } from "vue";

export function validateInputUser(input) {
  const validate = ref({});

  const inputPolicies = (users) => {
    return users.split(" ").every((user) => user[0] == "@");
  };

  const inputIterable = (users) => {
    return users.split(" ").map((user) => [...user].splice(1).join(""));
  };

  const findInvalidUser = (users) => {
    const error = [];

    unref(users).forEach((user, index) => {
      Axios.get(`${environment.backend}/api/tweet?myList=${user}`)
        //
        .then((tweet) => {
          if (tweet?.data?.meta?.result_count == 0) error.push(user);
        });
    });
    return error;
  };

  const onlyValidUser = (users, data) => {
    return users.filter((user, index) => {
      return user != data[index];
    });
  };

  if (inputPolicies(input)) {
    const invalid = findInvalidUser(inputIterable(input));
    //
    validate.value = {
      valid: true,
      invalid: invalid,
      message: "",
      users: onlyValidUser(inputIterable(input), invalid),
    };
  } else {
    validate.value = {
      valid: false,
      message: "the @ is not optional",
      users: "",
    };
  }

  return { validate };
}
