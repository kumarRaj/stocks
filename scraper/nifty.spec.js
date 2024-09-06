const axios = require('axios');
const fileSystem = require('./fileSystem');
const resources = require('./constants/resources');
const { fetchNifty50Companies } = require('./nifty');

jest.mock('axios');
jest.mock('./fileSystem');
jest.mock('./constants/resources', () => ({
  nifty50URL: 'http://mock-nifty50-url.com',
}));

describe('fetchNifty50Companies', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch company names and save the result using fileSystem', async () => {
    // Mock data for axios response
    const mockCompanies = {
      data: {
        data: [
          { symbol: 'COMPANY1' },
          { symbol: 'COMPANY2' },
          { symbol: 'COMPANY3' }
        ],
      },
    };

    // Mock the axios get request to return mock data
    axios.get.mockResolvedValue(mockCompanies);

    // Mock the fileSystem save method
    fileSystem.save.mockResolvedValue();

    // Call the function
    await fetchNifty50Companies();

    // Check if axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith('http://mock-nifty50-url.com');

    // Check if fileSystem.save was called with the correct arguments
    const expectedResult = {
      name: 'NIFTY50',
      company: ['COMPANY1', 'COMPANY2', 'COMPANY3'],
    };
    expect(fileSystem.save).toHaveBeenCalledWith(expectedResult, 'category', 'NIFTY50');
  });

  it('should handle errors from axios gracefully', async () => {
    // Mock axios to reject
    axios.get.mockRejectedValue(new Error('API request failed'));

    // Call the function and catch any thrown errors
    await expect(fetchNifty50Companies()).rejects.toThrow('API request failed');

    // Check that fileSystem.save is not called in case of error
    expect(fileSystem.save).not.toHaveBeenCalled();
  });
});
