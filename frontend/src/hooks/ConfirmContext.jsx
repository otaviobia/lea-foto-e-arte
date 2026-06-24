import { createContext, useState, useCallback } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const ConfirmContext = createContext(() => Promise.resolve(false));

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);
  // state = { message, resolve }

  const confirm = useCallback(message => {
    return new Promise(resolve => {
      setState({ message, resolve });
    });
  }, []);

  const handleChoice = answer => {
    state?.resolve(answer);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {state && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 flex flex-col gap-4 shadow-xl">
            <h2 className="text-2xl font-bold font-viminalis">
              Confirmar ação
            </h2>
            <p className="text-gray-500 text-sm">{state.message}</p>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => handleChoice(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleChoice(true)}
                className="px-4 py-2 bg-lfapink text-white rounded-lg hover:brightness-90"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
