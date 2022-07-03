<script setup>
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"
import { useStore } from "vuex";

const SignIn = ref(null);

const router = useRouter()
const store = useStore();
const emit = defineEmits(["dropSetting"]);

const event = (event) => {
    const modal = document.getElementById('close-modal');

    if (event.target == modal) emit('dropSetting');
}

onMounted(() => {
    let ui = firebaseui.auth.AuthUI.getInstance();

    if (!ui)
        ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return false;
            },
        },
        signInFlow: "popup",
        signInSuccessUrl: "/",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
    }

    ui.start("#firebaseui-auth-container", uiConfig);
})

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        SignIn.value = user;
    }
})

const signOutButton = () => {
    firebase.auth().signOut();

    SignIn.value = null;
    store.dispatch("auth/logOut")

    emit("dropSetting");
    router.push("/");
}

</script> 

<template>
    <div class="wrap-setting" @click="event($event)">
        <div class="setting" id="close-modal">
            <div class="user-login" v-if="SignIn == null">
                <div class="title">
                    <span>Login</span>
                </div>
                <div class="login-option">
                    <div id="firebaseui-auth-container"></div>
                </div>
            </div>
            <div class="user-sign-in" v-if="SignIn != null">
                <div class="user-desc-and-setting">
                    <div class="profile-img">
                        <img :src="SignIn.photoURL" alt />
                    </div>
                    <div class="user-info">
                        <div class="user-name">
                            <span>{{ SignIn.displayName }}</span>
                        </div>
                        <div class="user-email">
                            <span>{{ SignIn.email }}</span>
                        </div>
                    </div>
                </div>
                <div class="setting-menu">
                    <div class="sign-out" @click="signOutButton()">
                        <span>Sign out</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.wrap-setting {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
  
    /* background-color: rgba(0, 0, 0, 0.5); */
    display: table;
}

.setting {
    display: table-cell;
    vertical-align: middle;

    /* width: 320px; */

    /* background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
        0px 2px 6px 2px rgb(60 64 67 / 15%); */
}

/* Login */

.title {
    font-weight: bold;
    font-size: 20px;
    color: #182430;

    margin: 10px 0 10px 20px;
}

.login-option {
    text-align: center;
}

/* Sign in */

.user-sign-in {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 320px;
    margin: 0px auto;

    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    box-shadow: 0px 1px 2px 0px rgb(60 64 67 / 30%),
        0px 2px 6px 2px rgb(60 64 67 / 15%);

}

.user-desc-and-setting {
    display: flex;
    flex-direction: column;
    align-items: center;

    text-align: center;

    padding: 15px 0;
}

.profile-img {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 15px;
}

.profile-img img {
    width: 80px;
    height: 80px;

    border-radius: 50%;
    object-fit: cover;
}

.user-name {
    font-weight: 500;
    color: #182430;

    font-size: 17px;
}

.user-email {
    color: rgb(126, 126, 126);
    font-weight: 500;
    font-size: 14px;

    padding-top: 2px;
}

.setting-menu {
    width: 100%;
    text-align: center;
}

.sign-out {
    padding: 15px 0;
    cursor: pointer;
}

.sign-out:hover {
    background-color: rgba(0, 0, 0, 0.03);
}
</style>

