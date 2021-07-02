import { useEffect } from "react";
import t from "prop-types";
import useChainId from "../hooks/use-chain-id";
import usePrevious from "../hooks/use-previous";

export default function ChainChangeWatcher({ children }) {
  useReloadOnChainChanged();

  return children;
}

ChainChangeWatcher.propTypes = {
  children: t.node.isRequired,
};

function useReloadOnChainChanged() {
  const chainId = useChainId();
  const previousChainId = usePrevious(chainId);

  useEffect(() => {
    if (previousChainId !== undefined) {
      console.info("Chain ID changed:", chainId);
      window.location.reload();
    }
  }, [previousChainId, chainId]);
}
