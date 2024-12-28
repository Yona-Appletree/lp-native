import { ChevronRightIcon } from '@heroicons/react/16/solid';

export function EntityPanel() {
  return (
    <div className={'border border-gray-500'}>
      {/* ------------------------------------------------------------------ */}
      {/* Header */}

      <h1
        className={
          'bg-gray-800 px-1 m-0 border-b border-gray-500 flex items-baseline'
        }
      >
        <strong className={'flex-grow'}>LED Strip</strong>
        <em className={'text-gray-400 text-sm'}>Sequential RGB Fixture</em>
      </h1>

      {/* ------------------------------------------------------------------ */}
      {/* Content */}

      <div className={'px-1'}>
        <section>
          <input type="checkbox" className="sr-only" />
          <label
            className={
              'text-sm text-gray-500 ' +
              'border-b border-gray-500 ' +
              'flex items-center'
            }
          >
            <ChevronRightIcon className={'w-4 h-4'}></ChevronRightIcon>
            Input
          </label>
        </section>
      </div>
    </div>
  );
}

export default EntityPanel;
