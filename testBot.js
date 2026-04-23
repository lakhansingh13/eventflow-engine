import axios from "axios";

const URL = "http://localhost:3000/api/activity/join/69ea33935994114192444d85";

const testBot = async () => {
  for (let i = 1; i <= 10; i++) {
    try {
      const res = await axios.post(URL);
      console.log(`Request ${i}:`, res.data);
    } catch (err) {
      if (err.response) {
        console.log(`Request ${i}:`, err.response.status, err.response.data);
      } else {
        console.log(`Request ${i}: Error`);
      }
    }
  }
};

testBot();