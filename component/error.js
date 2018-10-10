export default function error(error){
    switch (error.code) {
        case "auth/user-disabled":
          Alert.alert("The user corresponding to the given email has been disabled. ")
          break;

        case "auth/invalid-email":
          Alert.alert("The email address is not valid.")
          break;

        case "auth/user-not-found":
          Alert.alert("There is no user corresponding to the given email.")
          break;

        case "auth/wrong-password":
          Alert.alert("The password is invalid for the given email," +
            " or the account corresponding to the email does not have a password set.")
          break;
      }
}