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
  unauthorize: () => void;
  closeDrawer: () => void;
  openDrawer: (data?: any) => void;
  setDrawerView: (view: string) => void;
  closeModal: () => void;
  closeSidebar: () => void; // Add this line
  closeFilter: () => void; // Add this line
  openFilter: () => void; // Add this line
  closeShop: () => void; // Add this line
  openShop: () => void; // Add this line
  displayShop: () => void; // Add this line
};
