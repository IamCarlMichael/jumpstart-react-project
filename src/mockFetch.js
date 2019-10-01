const realFetch = window.fetch;

export const mock = data => {
  if (window.fetch === realFetch) {
    window.fetch = jest.fn();
  }
  window.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(data)
  });
};

export const mockOnce = data => {
  if (window.fetch === realFetch) {
    window.fetch = jest.fn();
  }
  window.fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue(data)
  });
};

export const mockRestore = () => {
  if (window.fetch !== realFetch) {
    window.fetch.mockRestore();
  }
};

export default {
  mock,
  mockOnce,
  mockRestore
};
