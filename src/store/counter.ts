import { create } from 'zustand';

type BearState = {
  bears: number;
  increase: () => void;
  clear: () => void;
  update: (newBears: number) => void;
};

export const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  clear: () => set({ bears: 0 }),
  update: (newBears) => set({ bears: newBears }),
}));

// import { useBearStore } from "./store/couter";
//
// function App() {
//   // const bears = useBearStore((state) => state.bears);
//   // const increase = useBearStore((state) => state.increase);
//   // const clear = useBearStore((state) => state.clear);
//   // const update = useBearStore((state) => state.update);
//   const { bears, increase, clear, update } = useBearStore();
//   return (
//     <>
//       {bears}
//       <button onClick={increase}>increase</button>
//       <button onClick={clear}>clear</button>
//       <button onClick={() => update(100)}>update</button>
//     </>
//   );
// }
//
// export default App;
