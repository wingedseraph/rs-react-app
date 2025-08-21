import UncontrolledForm from '@/features/forms/UncontrolledForm/UncontrolledForm';
import CustomCursor from '@/shared/ui/CustomCursor/CustomCursor';
import Footer from '@/shared/ui/Footer/Footer';

export default function App() {
  return (
    <>
      <CustomCursor />
      <div className="animate-slideDown flex flex-col gap-10">
        {/* todo: animate-slideLeft or same animation? when modal is appear */}
        <button className="text-8xl">
          <span className="italic">un</span>controlled form
        </button>
        <button className="text-8xl">
          react <span className="italic">ho</span>ok form
        </button>

        <UncontrolledForm />
        {/* <ControlledForm/> */}
        {/* <Modal/> */}

        <Footer />
      </div>
    </>
  );
}
