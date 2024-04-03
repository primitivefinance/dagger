export const dfmmABI = [{"type":"constructor","inputs":[{"name":"weth_","type":"address","internalType":"address"}],"stateMutability":"nonpayable"},{"type":"receive","stateMutability":"payable"},{"type":"function","name":"allocate","inputs":[{"name":"poolId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"uint256[]","internalType":"uint256[]"}],"stateMutability":"payable"},{"type":"function","name":"deallocate","inputs":[{"name":"poolId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"uint256[]","internalType":"uint256[]"}],"stateMutability":"nonpayable"},{"type":"function","name":"init","inputs":[{"name":"params","type":"tuple","internalType":"struct InitParams","components":[{"name":"name","type":"string","internalType":"string"},{"name":"symbol","type":"string","internalType":"string"},{"name":"strategy","type":"address","internalType":"address"},{"name":"tokens","type":"address[]","internalType":"address[]"},{"name":"data","type":"bytes","internalType":"bytes"},{"name":"feeCollector","type":"address","internalType":"address"},{"name":"controllerFee","type":"uint256","internalType":"uint256"}]}],"outputs":[{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"uint256[]","internalType":"uint256[]"},{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"payable"},{"type":"function","name":"lpTokenImplementation","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"pools","inputs":[{"name":"poolId","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"tuple","internalType":"struct Pool","components":[{"name":"strategy","type":"address","internalType":"address"},{"name":"tokens","type":"address[]","internalType":"address[]"},{"name":"reserves","type":"uint256[]","internalType":"uint256[]"},{"name":"totalLiquidity","type":"uint256","internalType":"uint256"},{"name":"liquidityToken","type":"address","internalType":"address"},{"name":"feeCollector","type":"address","internalType":"address"},{"name":"controllerFee","type":"uint256","internalType":"uint256"}]}],"stateMutability":"view"},{"type":"function","name":"swap","inputs":[{"name":"poolId","type":"uint256","internalType":"uint256"},{"name":"recipient","type":"address","internalType":"address"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[{"name":"","type":"address","internalType":"address"},{"name":"","type":"address","internalType":"address"},{"name":"","type":"uint256","internalType":"uint256"},{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"payable"},{"type":"function","name":"update","inputs":[{"name":"poolId","type":"uint256","internalType":"uint256"},{"name":"data","type":"bytes","internalType":"bytes"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"weth","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"event","name":"Allocate","inputs":[{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"poolId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"deltas","type":"uint256[]","indexed":false,"internalType":"uint256[]"},{"name":"deltaL","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Deallocate","inputs":[{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"poolId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"deltas","type":"uint256[]","indexed":true,"internalType":"uint256[]"},{"name":"deltaL","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Init","inputs":[{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"strategy","type":"address","indexed":false,"internalType":"address"},{"name":"lpToken","type":"address","indexed":false,"internalType":"address"},{"name":"poolId","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"tokens","type":"address[]","indexed":true,"internalType":"address[]"},{"name":"reserves","type":"uint256[]","indexed":false,"internalType":"uint256[]"},{"name":"totalLiquidity","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"event","name":"Swap","inputs":[{"name":"account","type":"address","indexed":true,"internalType":"address"},{"name":"poolId","type":"uint256","indexed":true,"internalType":"uint256"},{"name":"recipient","type":"address","indexed":false,"internalType":"address"},{"name":"tokenIn","type":"address","indexed":false,"internalType":"address"},{"name":"tokenOut","type":"address","indexed":false,"internalType":"address"},{"name":"inputAmount","type":"uint256","indexed":false,"internalType":"uint256"},{"name":"outputAmount","type":"uint256","indexed":false,"internalType":"uint256"}],"anonymous":false},{"type":"error","name":"ERC1167FailedCreateClone","inputs":[]},{"type":"error","name":"InvalidDuplicateTokens","inputs":[]},{"type":"error","name":"InvalidInvariant","inputs":[{"name":"invariant","type":"int256","internalType":"int256"}]},{"type":"error","name":"InvalidMaximumTokens","inputs":[]},{"type":"error","name":"InvalidMinimumTokens","inputs":[]},{"type":"error","name":"InvalidReserves","inputs":[]},{"type":"error","name":"InvalidTokenDecimals","inputs":[]},{"type":"error","name":"InvalidTransfer","inputs":[]},{"type":"error","name":"Locked","inputs":[]},{"type":"error","name":"NotController","inputs":[]},{"type":"error","name":"OnlyWETH","inputs":[]}]