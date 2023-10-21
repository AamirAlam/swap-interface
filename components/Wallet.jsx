import { ConnectButton as MetamaskButton } from "@rainbow-me/rainbowkit";

export default function ConnectButton() {
  const nbsp = "\u00A0";

  return (
    <MetamaskButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className={
              connected
                ? "wallet-wrapper connected slide-in-top-bar"
                : "wallet-wrapper"
            }
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="button connect"
                    onClick={openConnectModal}
                    type="button"
                  >
                    {" "}
                    Connect{nbsp}Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    className="button"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <>
                  <button
                    className="icon"
                    onClick={openChainModal}
                    type="button"
                    style={{
                      background: chain.iconBackground,
                    }}
                  >
                    {chain.hasIcon && (
                      <picture className="wallet-token-icon">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                          />
                        )}
                      </picture>
                    )}
                  </button>

                  <button
                    className="button gradient-text"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    <span className="balance">
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </span>
                  </button>
                </>
              );
            })()}
          </div>
        );
      }}
    </MetamaskButton.Custom>
  );
}
