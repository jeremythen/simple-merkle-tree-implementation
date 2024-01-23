
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Merkle Tree Verification</title>
    <script src="https://cdn.rawgit.com/emn178/js-sha256/master/build/sha256.min.js"></script>
</head>
<body>
    <h1>Merkle Tree Verification</h1>

    <form id="verificationForm">
        <label for="addressInput">Enter Address:</label>
        <input type="text" id="addressInput" required>
        <button type="button" onclick="verifyAddress()">Verify Address</button>
    </form>

    <div id="result"></div>

    <script>
        // Function to calculate the Merkle root from an array of leaves
        function calculateMerkleRoot(leaves) {
            if (leaves.length === 0) {
                throw new Error('Empty list of leaves');
            }

            if (leaves.length === 1) {
                return leaves[0];
            }

            const nextLevel = [];
            for (let i = 0; i < leaves.length; i += 2) {
                const left = leaves[i];
                const right = i + 1 < leaves.length ? leaves[i + 1] : leaves[i];
                const combined = sha256(left + right);
                nextLevel.push(combined);
            }

            return calculateMerkleRoot(nextLevel);
        }

        // Example random addresses
        const addresses = [
            '0x5AaFeCeFED7c58f0eA7a1783b3a579D7e5fDC489',
            '0x1aF4b0d4162733F942f06e1b75c2278A5034e2aA',
            '0xEf5d34B2BBBEdc6019b9771b6b30F86a28e91e2F',
            '0x7C7b26c98e47797F781911bDE79dD35c16D673F7',
            '0xC0fA1b63e36BeC2E904b5F1a836dD82b7E2bc077'
        ];

        // Calculate Merkle root
        const merkleRoot = calculateMerkleRoot(addresses);

        // Function to verify address
        function verifyAddress() {
            const addressToVerify = document.getElementById('addressInput').value;

            const hashedAddress = sha256(addressToVerify.toLowerCase()); // Normalize to lowercase for case-insensitivity

            if (addresses.includes(hashedAddress)) {
                document.getElementById('result').innerText = `${addressToVerify} is a valid address.`;
            } else {
                document.getElementById('result').innerText = `${addressToVerify} is NOT a valid address.`;
            }
        }
    </script>
</body>
</html>
