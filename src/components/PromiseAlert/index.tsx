import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { type VariantProps } from 'class-variance-authority';
import { CheckIcon, Info, X } from 'lucide-react';
import * as React from 'react';

export const AlertDialogContext = React.createContext<(params: AlertAction) => Promise<AlertAction['type'] extends 'alert' | 'confirm' ? boolean : null | string>>(() => null!);

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

const defaultCancelButtonText: string = 'Cancelar';
const defaultActionButtonText: string = 'Confirmar';

export type AlertStatus = 'success' | 'error' | 'info';

export type CommonAlertProps = {
  title: string;
  body?: string;
  status?: AlertStatus;
  showCancelButton?: boolean;
  showActionButton?: boolean;
  cancelButtonText?: string;
  actionButtonText?: string;
  cancelButtonVariant?: ButtonVariant;
  actionButtonVariant?: ButtonVariant;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  footerClassName?: string;
  contentClassName?: string;
  actionButtonClassName?: string;
  cancelButtonClassName?: string;
};

export type AlertAction =
  | ({
      type: 'alert';
    } & CommonAlertProps)
  | ({
      type: 'confirm';
    } & CommonAlertProps)
  | ({
      type: 'prompt';
      defaultValue?: string;
      inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    } & CommonAlertProps)
  | { type: 'close' };

interface AlertDialogState extends CommonAlertProps {
  open: boolean;
  type: 'alert' | 'confirm' | 'prompt';
  cancelButtonText: string;
  actionButtonText: string;
  defaultValue?: string;
  inputProps?: React.PropsWithoutRef<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>>;
}

export function alertDialogReducer(state: AlertDialogState, action: AlertAction): AlertDialogState {
  switch (action.type) {
    case 'close':
      return { ...state, open: false };
    case 'alert':
    case 'confirm':
    case 'prompt':
      const commonProps = {
        ...action,
        cancelButtonText: action.cancelButtonText || (action.type === 'alert' ? defaultActionButtonText : defaultCancelButtonText),
        actionButtonText: action.actionButtonText || defaultActionButtonText,
        cancelButtonVariant: action.cancelButtonVariant || 'destructive',
        actionButtonVariant: action.actionButtonVariant || 'default',
        showCancelButton: action.showCancelButton ?? true,
        showActionButton: action.showActionButton ?? true,
      };

      if (action.type === 'alert') {
        commonProps.showActionButton = action.showActionButton ?? true;
        commonProps.showCancelButton = action.showCancelButton ?? true;
      }

      return {
        ...state,
        open: true,
        ...commonProps,
        ...(action.type === 'prompt' && {
          defaultValue: action.defaultValue,
          inputProps: action.inputProps,
        }),
      };
    default:
      return state;
  }
}

type Params<T extends 'alert' | 'confirm' | 'prompt'> = Omit<Extract<AlertAction, { type: T }>, 'type'> | string;

export function AlertDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(alertDialogReducer, {
    open: false,
    title: '',
    body: '',
    type: 'alert',
    cancelButtonText: defaultCancelButtonText,
    actionButtonText: defaultActionButtonText,
    cancelButtonVariant: 'destructive',
    actionButtonVariant: 'default',
    status: undefined,
    showCancelButton: true,
    showActionButton: true,
    headerClassName: '',
    titleClassName: '',
    descriptionClassName: '',
    footerClassName: '',
    contentClassName: '',
    actionButtonClassName: '',
    cancelButtonClassName: '',
  });

  const resolveRef = React.useRef<(value: any) => void>(() => false); // Aquí es `value: any` porque puede ser boolean, string o null

  const close = React.useCallback(() => {
    dispatch({ type: 'close' });
    resolveRef.current?.(false); // Cancelación siempre devuelve false
  }, []);

  const confirm = React.useCallback((value?: string | boolean) => {
    dispatch({ type: 'close' });
    // Si value es undefined, por defecto se asume confirmación exitosa (true)
    resolveRef.current?.(value ?? true);
  }, []);

  const dialog = React.useCallback(async <T extends AlertAction>(params: T) => {
    dispatch(params);

    return new Promise<T['type'] extends 'alert' | 'confirm' ? boolean : null | string>(resolve => {
      resolveRef.current = resolve;
    });
  }, []);

  const AlertIcon: React.FC<{ status?: AlertStatus }> = React.memo(({ status }) => {
    switch (status) {
      case 'success':
        return <CheckIcon className='mx-auto size-[60px] rounded-full bg-green-normal fill-white p-1' />;
      case 'error':
        return <X className='mx-auto size-[60px] rounded-full bg-red-normal-hover p-1 text-white [&>circle]:text-red-normal-hover' />;
      case 'info':
        return <Info className='mx-auto size-[65px] rounded-full bg-blue text-white [&>circle]:text-blue' />;
      default:
        return null;
    }
  });

  const isAlertType = state.type === 'alert';

  return (
    <AlertDialogContext.Provider value={dialog}>
      {children}
      <AlertDialog
        open={state.open}
        onOpenChange={open => {
          if (!open) close(); // Si el usuario cierra el modal con Escape o clic fuera
          return;
        }}
      >
        <AlertDialogContent className={cn('max-w-md rounded-[8px] px-[65px] py-[45px]', state.contentClassName)}>
          <form
            onSubmit={event => {
              event.preventDefault();
              const promptInput = event.currentTarget.elements.namedItem('prompt') as HTMLInputElement;
              confirm(promptInput?.value ?? true); // Para prompt, si no hay valor, devolver string vacío en lugar de undefined para consistencia
            }}
          >
            <AlertDialogHeader className={cn('flex flex-col items-center text-center font-inter font-medium text-tundora-dark text-xl', state.headerClassName)}>
              <AlertIcon status={state.status} />
              <AlertDialogTitle className={cn('!mt-[36px] !mb-6 text-center font-bold text-xl', state.titleClassName)}>{state.title}</AlertDialogTitle>
              {state.body ? (
                <AlertDialogDescription className={cn('!mb-6 max-h-[150px] max-w-[317px] overflow-y-auto overflow-x-hidden text-center text-base text-tundora-dark', state.descriptionClassName)}>{state.body}</AlertDialogDescription>
              ) : (
                <AlertDialogDescription className='sr-only'>No hay descripción</AlertDialogDescription>
              )}
            </AlertDialogHeader>

            {state.type === 'prompt' && <Input name='prompt' defaultValue={state.defaultValue} {...state.inputProps} className='my-4' />}

            <AlertDialogFooter className={cn('flex justify-center gap-6 sm:justify-center', state.footerClassName)}>
              {/* Botón de Cancelar / OK para Alert */}
              {state.showCancelButton && (
                <Button
                  className={cn('w-fit', state.cancelButtonClassName)}
                  type='button'
                  onClick={() => {
                    // Si es una alerta, el botón de cancelar actúa como OK/confirmar
                    if (isAlertType) {
                      confirm(false); // Resuelve la promesa como true (OK)
                    } else {
                      close(); // Si no es una alerta, es un cancelar normal, resuelve a false
                    }
                  }}
                  variant={state.cancelButtonVariant}
                >
                  {state.cancelButtonText}
                </Button>
              )}
              {/* Botón de Acción (Confirmar/Aceptar) */}
              {state.showActionButton && (
                <Button className={cn('w-fit', state.actionButtonClassName)} type='submit' variant={state.actionButtonVariant}>
                  {state.actionButtonText}
                </Button>
              )}
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
}

// Los hooks ya están bien tipados para los retornos de la promesa
export function useConfirm() {
  const dialog = React.useContext(AlertDialogContext);

  return React.useCallback(
    (params: Params<'confirm'>) => {
      // El retorno es Promise<boolean>
      return dialog({
        ...(typeof params === 'string' ? { title: params } : params),
        type: 'confirm',
      });
    },
    [dialog],
  );
}

export function usePrompt() {
  const dialog = React.useContext(AlertDialogContext);

  return (params: Params<'prompt'>) =>
    // El retorno es Promise<string | null>
    dialog({
      ...(typeof params === 'string' ? { title: params } : params),
      type: 'prompt',
    });
}

export function useAlert() {
  const dialog = React.useContext(AlertDialogContext);
  return (params: Params<'alert'>) =>
    // El retorno es Promise<boolean>
    dialog({
      ...(typeof params === 'string' ? { title: params } : params),
      type: 'alert',
    });
}
