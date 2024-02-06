export type State = {
  isAuthorized: boolean;
  displaySidebar: boolean;
  displayFilter: boolean;
  displayCart: boolean;
  displaySearch: boolean;
  displayMobileSearch: boolean;
  displayDrawer: boolean;
  drawerView: string | null;
  toastText: string;
  isStickyheader: boolean;
  data?: any;
};

export type ContextType = State & {
  withAuth: (fn: () => void) => void;
  authorize: () => void;
  closeDrawer: () => void;
};
