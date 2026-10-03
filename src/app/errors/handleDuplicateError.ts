export const handleDuplicateError = (err: any) => {
  const match = err.message.match(/(["'])(?:(?=(\?))\2.)*?\1/);
  const extractedMessage = match ? match[0] : 'Duplicate value';
  const statusCode = 409;
  const message = `${extractedMessage} is already exists`;
  return { statusCode, message, code: 'DUPLICATE_ENTRY' };
};