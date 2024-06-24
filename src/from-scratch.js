export const fetchHandler = async (url, options = {}) => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Fetch failed with status - ${response.status} ${response.statusText}}`)
    }

    const isJson = (response.headers.get('content-type') || '').includes('application/json');
    // const isJSON accessess the response, getting the headers key and getting the string 'content type'

    // Why is there an empty string?
    // Answer: if the headers.get is empty then it will return null and the rest of the function is not going to run (a guard clause essentially)

    if (isJson) { // if isJson is true
      const jsonData = await response.json();  // wait for fetch and return the data into json
      return [jsonData, null]
      // returns the tuple (immutable array) and turns it into json data and returns null for error handling
    }

    const textData = await response.text(); // waiting for a fetch response and turning the response into text
    return [textData, null] // returning the tuple with the json text and return null for error handling

  } catch (error) {
    console.warn(error) // print the error/warn message into the console
    return [null, error]
    // tuple is going to return null or error based off the promise

  }



};


