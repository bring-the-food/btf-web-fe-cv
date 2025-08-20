import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Menu from "@/components/home/Menu";
import Orders from "@/components/home/Orders";

export default function Home() {
  return (
    <div className="col-start-center clamp-[px,5,12,@sm,@lg] clamp-[py,10,20,@sm,@lg] w-full">
      <Image
        className="clamp-[mb,3.5,8,@sm,@lg] clamp-[w,3.8125rem,8rem,@sm,@lg]"
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
