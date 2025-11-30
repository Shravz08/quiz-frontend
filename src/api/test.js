import axios from "axios";

export async function testBackend() {
  try {
    const res = await axios.get("http://localhost:8080/test");
    console.log("Backend working:", res.data);
  } catch (err) {
    console.error("Error connecting backend:", err);
  }
}
