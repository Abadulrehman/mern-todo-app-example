import { useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LuCheck } from 'react-icons/lu';

import { todoCreateFormSchema } from '@mern-todo-app/models';
import { Form, FormControl, FormField, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { updateTodo } from 'lib/services/todo/update';
import { createTodo } from 'lib/services/todo/create';

export type EditData = {
  id: string;
  title: string;
};

type TodoFormProps = {
  editData?: EditData;
  onSubmit?: () => void;
};

const TodoForm: React.FC<TodoFormProps> = (props) => {
  const { editData } = props;

  const [savingTodo, setSavingTodo] = useState(false);

  const form = useForm<z.infer<typeof todoCreateFormSchema>>({
    resolver: zodResolver(todoCreateFormSchema),
    defaultValues: {
      title: editData?.title ?? '',
    },
  });

  async function onSubmit(formValues: z.infer<typeof todoCreateFormSchema>) {
    setSavingTodo(true);

    if (editData) {
      await updateTodo(editData?.id, formValues.title, null);
    } else {
      await createTodo(formValues.title);
    }

    props.onSubmit?.();
    form.reset();
    setSavingTodo(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full gap-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <>
              <span className="flex gap-3">
                <FormControl>
                  <Input placeholder="Todo title" maxLength={100} {...field} />
                </FormControl>
                <Button variant="outline" type="submit" disabled={savingTodo}>
                  <LuCheck size={18} />
                </Button>
              </span>
              <FormMessage />
            </>
          )}
        />
      </form>
    </Form>
  );
};

export default TodoForm;
