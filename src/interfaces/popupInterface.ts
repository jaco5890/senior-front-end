export default interface PopupProps {
  title: string;
  message: string;
  popupOutput: (param: any) => void;
}

export enum popupTypes {
  deleteUser,
}
