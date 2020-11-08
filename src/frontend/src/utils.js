export const fetchData = async (url, setterFunction, loaderSetter = null) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setterFunction(data);
      if (loaderSetter) {
        loaderSetter(false);
      }
    })
    .catch((err) => console.error(err));
};
export const getChannelBySlackId = (slack_id, channels) => {
  return channels.find((channel) => channel.slack_id === slack_id);
};

export const getUserBySlackId = (slack_id, users) => {
  return users.find((user) => user.slack_id === slack_id);
};
