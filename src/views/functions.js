export function errorHandle(err) {
    if (err.message == "Request failed with status code 401") {
        localStorage.removeItem("token");
        this.$router.push("/auth/login");
        return;
    } else {
        this.$notify({
            type: 'warn',
            text: err.message
        })
    }
}
export function commit(status, commit) {
    if (status) { this.$store.commit(`${commit}/success`); }
    else {
        this.$store.commit(`${commit}/error`);
    }

}

export function changeDateformat(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleString();
}

export function notify(data) {
    this.$notify({
        type: data.status ? "success" : "warn",
        text: data.msg ? data.msg : data.message
    });
}

export function getUserLevelKey(level) {
    switch (level) {
        case 'Super Senior':
            return 'ss';
        case 'Senior':
            return 'se';
        case 'Master':
            return 'ms';
        case 'agent':
            return 'ag';
        case 'Owner':
            return 'own';
        case 'Member':
            return 'mem';
        default:
            return 'admin'
    }
}