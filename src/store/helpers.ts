import { useConfirmStore } from "./confirmStore";

export const confirm = (message: string) => useConfirmStore.getState().openConfirm(message);
