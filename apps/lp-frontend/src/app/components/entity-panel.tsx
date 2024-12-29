import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@lp-native/ui/components/accordion';
import { Button } from '@lp-native/ui/components/button';
import { CopyIcon, TrashIcon } from 'lucide-react';

export function EntityPanel({
  entityLabel = 'LED Strip',
  entityRoleLabel = 'Sequential Pixel Fixture',
}) {
  return (
    <div className={'border border-gray-500 rounded'}>
      {/* ------------------------------------------------------------------ */}
      {/* Header */}

      <h1
        className={
          'bg-gray-800 px-2 m-0 border-b border-gray-500 rounded-t ' +
          'flex items-center justify-between'
        }
      >
        {/* Label */}
        <strong>{entityLabel}</strong>

        {/* Role Label */}
        <em className={'text-gray-400 text-sm'}>{entityRoleLabel}</em>

        {/* Actions */}
        <div>
          {/* Duplicate */}
          <Button variant="ghost" size="icon" className={'text-gray-400'}>
            <CopyIcon />
          </Button>

          {/* Delete */}
          <Button variant="ghost" size="icon" className={'text-gray-400'}>
            <TrashIcon />
          </Button>
        </div>
      </h1>

      {/* ------------------------------------------------------------------ */}
      {/* Content */}

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className={'w-full'}>Properties</AccordionTrigger>
          <AccordionContent className={'ml-1'}>
            Properties/inputs of the entity can be configured here.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className={'w-full'}>Outputs</AccordionTrigger>
          <AccordionContent className={'ml-1'}>
            Outputs of the entity can be seen here.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default EntityPanel;
