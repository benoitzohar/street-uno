export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
}

const messages: Message[] = [
];

export const getMessages = () => messages;

export const getMessage = (id: number) => messages.find(m => m.id === id);
