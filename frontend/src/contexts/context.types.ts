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
  openDrawer: (data?: any) => void; // Add this line
  setDrawerView: (view: string) => void; // Add this line
};
