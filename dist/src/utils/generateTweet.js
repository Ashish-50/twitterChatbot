"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateText = void 0;
const axios_1 = __importDefault(require("axios"));
function generateText(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:11434'; // Replace with the correct URL
        const generateEndpoint = '/api/generate';
        const url = apiUrl + generateEndpoint;
        try {
            const response = yield axios_1.default.post(url, {
                model: 'llama2',
                prompt: `give me a tweet of 20 words about ${word}`,
                stream: false,
            });
            return response.data.response;
        }
        catch (error) {
            // Handle errors here
            console.error('Error making API request:', error);
        }
    });
}
exports.generateText = generateText;
// async function pullModel(name: string) {
//   const apiUrl = 'http://localhost:11434/api/pull';
//   try {
//     const response = await axios.post(apiUrl, {
//       name: name,
//     });
//     // Handle the response data here
//     console.log(response.data);
//   } catch (error) {
//     // Handle errors here
//     console.error('Error making API request:', error);
//   }
// }
// Call the function with the model name
// pullModel('llama2');
// Call the function
