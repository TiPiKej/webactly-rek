const activityUrl = (type?: string) => `http://www.boredapi.com/api/activity${type ? `?type=${type}` : ""}`;

export {
    activityUrl,
};
