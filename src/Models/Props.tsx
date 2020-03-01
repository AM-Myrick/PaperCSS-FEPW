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