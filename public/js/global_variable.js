const base_api = [
    'https://wax.pink.gg',
    'https://wax.greymass.com',
    'https://wax.cryptolions.io',
    'https://wax.dapplica.io',
    'https://api-wax.eosauthority.com',
    'https://chain.wax.io',
]

const atomic_api = [
    'https://atomic.hivebp.io',
    'https://lazydigger-test-34rwm.ondigitalocean.app',
    ''
]

var bag;
var land;

var delay = 0;
var difficulty = 0;

const mining_account = "m.federation";
const federation_account = "federation";
//Defualt value
var errorDelay = 1.5 * (60 * 1000);
var cpuDelay = 5.0 * (60 * 1000);
var mineCountdownTime = 6.5 * (60 * 1000);
var loginCountdownTime = 3 * (60 * 1000);

//Init countDownFnish
var mineCountdownFinishTime = new Date().getTime();
var loginCountdownFinishTime = new Date().getTime();
var claimCountdownFinishTime = new Date().getTime();
var delay = 0;
var nextmine = 0;

var isMining = false;
var minedCount = 0;

var totalget = 0.0;
var lastTLM = 0.0;
var wax_balance = 0.0;

var mineInterval;
var newMineInterval;
var loginInterval;
var nftInterval;

var userAccount = "";
var oldNonce;
var isVIP = false;
var current_world;

var pool_avg = 0;