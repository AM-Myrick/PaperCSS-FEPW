export interface AppProps {
    closeMenu: () => void;
}

export interface NavProps extends AppProps {
    showRegisterModal: () => void;
    showLoginModal: () => void;
}

export interface NavLinksProps extends NavProps {
    width: number;
}

export type ModalType = "login" | "register" | "";

export interface ModalProps extends AppProps {
    showModal: boolean;
    modalVersion: ModalType;
}