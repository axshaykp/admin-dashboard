import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { useToast } from "@/app/components/ui/use-toast";
import { db } from "@/app/lib/config";
import { deleteDoc, doc } from "firebase/firestore";
import { AiFillDelete } from "react-icons/ai";

interface DeleteProps {
  collection: string;
  data: any;
  setDataUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  dataUpdated: boolean;
}

export function Delete({
  collection,
  data,
  setDataUpdated,
  dataUpdated,
}: DeleteProps) {
  const toast = useToast();
  async function handleDelete() {
    await deleteDoc(doc(db, collection, data.id)).then(() => {});
    setDataUpdated(!dataUpdated);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <AiFillDelete />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
