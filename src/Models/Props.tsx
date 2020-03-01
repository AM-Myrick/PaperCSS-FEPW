import { RouteComponentProps } from "react-router";

export interface AppProps extends RouteComponentProps {
    closeMenu: () => void;
}

export interface NavProps extends AppProps {
    showRegisterModal: () => void;
    showLoginModal: () => void;
}

export interface NavLinksProps {
    width: number;
    closeMenu: () => void;
    showRegisterModal: () => void;
    showLoginModal: () => void;
}

export type ModalType = "login" | "register" | "";

export interface ModalProps {
    showModal: boolean;
    modalVersion: ModalType;
    closeMenu: () => void;
}