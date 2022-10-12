        // Connect Metamask - Get Account Address + ChainID
        let chains = {
            "0x1": "Ethereum",
            "0xaa36a7": "Sepolia",
            "0x3": "Ropsten",
            "0x4": "Rinkeby",
            "0x5": "Goerli",
            "0x2a": "Kovan"
        }
        let account;
        const connectMetamask = async() => {
            console.log("connectMetamask clicked!");
            if (window.ethereum !== undefined) {
                console.log(window.ethereum);
                const accounts = await ethereum.request({method: "eth_requestAccounts"});
                const chainId = await ethereum.request({ method: 'eth_chainId' });
                account = accounts[0];
                console.log("Your Metamask Address: " + account);
                console.log("Chain ID: " + chainId);
                document.getElementById("walletAddress").innerHTML = account;
                document.getElementById("blockchain").innerHTML = chains[chainId];
                /*
                if(chainId == "0x1") {
                    document.getElementById("blockchain").innerHTML = "Ethereum";
                } else if (chainId == "0xaa36a7") {
                    document.getElementById("blockchain").innerHTML = "Sepolia (Testnet)";
                }
                */
            } else if(window.ethereum == undefined) {
                let noMetamask = "Metamask is not installed";
                console.log(noMetamask);
                document.getElementById("walletAddress").innerHTML = noMetamask;
            }
        }

        // Connect to Smart Contract using Web3.js
        const connectContract = async () => {
            const ABI = [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_yourFavouritePizza",
                            "type": "string"
                        }
                    ],
                    "name": "setPizza",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getPizza",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ]; // ABI
            const Address = "0xC029b6C562EF1C6C79e2Ba27aae309e247604F78"; // Contract Address
            window.web3 = await new Web3(window.ethereum);
            console.log(window.web3);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            console.log(window.contract);
            document.getElementById("contract").innerHTML = "Connected to Smart Contract";
        }

        // Read the number from the Smart Contract
        const readContract = async () => {
            const data = await window.contract.methods.getPizza().call();
            document.getElementById("contractValue").innerHTML = data;
        }

        // Read the number from the Smart Contract
        const writeToContract = async () => {
            var favPizza = document.getElementById("favPizza").value;
            const data = await window.contract.methods.setPizza(favPizza).send({from: account});
        }