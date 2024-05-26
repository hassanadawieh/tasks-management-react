import Pusher from 'pusher-js';

const pusher = new Pusher("d1932e902dd4f994bd56", {
    cluster: 'ap2'
});

export default pusher;