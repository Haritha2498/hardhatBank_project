##  BL🔍CK VIEWER ##
Block Viewer is a streamlined blockchain explorer designed specifically for EVM (Ethereum Virtual Machine) based blockchain networks. Its primary advantage is its lightweight nature, ensuring that it doesn't consume excessive resources like many other explorers. This makes it particularly suitable for those who need a less resource-intensive solution. Moreover, as long as users have access to the RPC APIs, they can utilize Block Viewer seamlessly. A significant motivation behind the development of Block Viewer was the realization that many existing explorers are not only resource-heavy but also lack compatibility with private network setups. Block Viewer fills this gap, offering a versatile tool for both public and private blockchain explorations.

🎯 Purpose
The explorer is primarily designed for real-time viewing of private blockchain networks, addressing the requirements when EVM-based networks are utilized for private applications. It's a lightweight, resource-efficient application intended to operate concurrently with the network. Moreover, its minimal reliance on external libraries such as web3 or ether.js ensures hassle-free maintenance.

🛠 Built With
NodeJS JavaScript ReactJs Ethereum
📢 Prerequisites
NodeJS 16.x
⚙️ Run Locally
Clone the Project and change into the directory

git clone https://github.com/Kerala-Blockchain-Academy/light-explorer
cd light-explorer
Install dependencies

npm install
To connect to any EVM-compatible blockchain network, update the REACT_APP_API_URL value in the .env file.

light-explorer/.env

Line 1 in b7c09be

 REACT_APP_API_URL=[RPC/API/URL] 
Run the application

npm start
🐳 Docker
Now to run using docker execute the following command

docker compose up -d
🎞️ Demo
Demo

📦 Planned Updates
MetaMask Compatability
UI Updates
Mobile View
Production Release
Desktop App
🎗️ Contributing
The open source community thrives on the contributions of its members, making it a remarkable space for learning, inspiration, and innovation. Every contribution you offer is deeply valued.

Should you have ideas to enhance this, kindly fork the repository and initiate a pull request. Alternatively, you can open an issue and tag it with enhancement. Remember to star the project! Many thanks!

Fork the Project
Create your Feature Branch (git checkout -b feature/<feature_name>)
Commit your Changes (git commit -m '<feature_name>_added')
Push to the Branch (git push origin feature/<feature_name>)
Open a Pull Request
📜 License
This project is licensed under the MIT license - see the LICENSE.md file for details.
