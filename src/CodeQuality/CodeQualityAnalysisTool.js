import axios from "axios";

class CodeQualityAnalysisTool {
  constructor() {

  }

  // gets the file from a raw github url
  async getFile(url) {
    if (!url) {
      return;
    }
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CodeQualityAnalysisTool;