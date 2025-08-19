import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Menu from "@/components/home/Menu";
import Orders from "@/components/home/Orders";

export default function Home() {
  return (
    <div className="col-start-center px-5 py-10 w-full">
      <Image
        className="my-3.5"
        src="/svg/logo.svg"
        alt="Bring this food logo"
        width={61}
        height={48}
        priority
      />

      <div className="w-full">
        <Tabs defaultValue="menu" className="w-full">
          <TabsList>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="menu">
            <Menu />
          </TabsContent>
          <TabsContent value="orders">
            <Orders />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
