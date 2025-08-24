import { appStore } from '@/app/store';
import HookForm from '@/features/forms/HookForm/HookForm';
import UncontrolledForm from '@/features/forms/UncontrolledForm/UncontrolledForm';
import { Card } from '@/shared/ui/Card/Card';
import CustomCursor from '@/shared/ui/CustomCursor/CustomCursor';
import Footer from '@/shared/ui/Footer/Footer';
import Modal from '@/shared/ui/Modal/Modal';

export default function App() {
  const { isModalOpen, modalType, openModal, closeModal, formSubmissions } =
    appStore();

  const renderModalContent = () => {
    switch (modalType) {
      case 'uncontrolled':
        return <UncontrolledForm />;

      case 'hook':
        return <HookForm />;

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'uncontrolled':
        return 'Uncontrolled Form';

      case 'hook':
        return 'React Hook Form';

      default:
        return '';
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="animate-slideDown flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          {/* refactor: use Button component!! with builder to add italic on need */}
          <button
            onClick={() => {
              openModal('uncontrolled');
            }}
            className="focus:outline-secondary text-4xl md:text-8xl"
          >
            <span className="italic">un</span>controlled form
          </button>
          <button
            onClick={() => {
              openModal('hook');
            }}
            className="focus:outline-secondary text-4xl md:text-8xl"
          >
            react <span className="italic">ho</span>ok form
          </button>
        </div>

        {/* todo: cardList component */}
        {formSubmissions.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-col md:flex-row">
              {formSubmissions.map((submission) => (
                <Card key={submission.id} data={submission} />
              ))}
            </div>
          </div>
        )}

        <Footer />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={getModalTitle()}>
        {renderModalContent()}
      </Modal>
    </>
  );
}
