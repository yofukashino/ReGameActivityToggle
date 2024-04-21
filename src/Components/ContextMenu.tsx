import { flux as Flux, React } from "replugged/common";
import { ContextMenu } from "replugged/components";
import Modules from "../lib/requiredModules";
import Icons from "./Icons";
import Utils from "../lib/utils";
const { MenuCheckboxItem, ContextMenu: Menu, MenuSeparator, MenuItem } = ContextMenu;

export default (props) => {
  const { SpotifyAccounts } = Flux.useStateFromStores([Modules.ConnectedAccountsStore], () => {
    const ConnectedAccounts = Modules.ConnectedAccountsStore.getAccounts();
    return {
      SpotifyAccounts: ConnectedAccounts.filter((a) => a.type === "spotify"),
    };
  });

  return (
    <Menu {...props} navId="yofukashino">
      <MenuItem
        label="Spotify Accounts"
        subtext="Here you may toggle which account is allowed to show song playing as activiy on your account"
        id="spotify-accounts"
        showIconFirst={true}
        icon={() => <Icons.music height="16" width="16" />}
        action={() => Utils.toggleSpotifyActivity()}
      />
      <MenuSeparator />
      {SpotifyAccounts.length ? (
        SpotifyAccounts.map((a) => {
          const [value, onChange] = React.useState(a.showActivity);
          return (
            <MenuCheckboxItem
              id={a.id}
              label={a.name}
              checked={value}
              action={() => {
                onChange((prev) => !prev);
                Utils.toggleSpotifyActivity(a);
              }}
            />
          );
        })
      ) : (
        <MenuItem
          label="No Accounts"
          subtext="You may connect a spotify account from connections tab in settings first."
          id="no-accounts"
          showIconFirst={true}
          icon={() => <Icons.noLive height="16" width="16" />}
        />
      )}
    </Menu>
  );
};
