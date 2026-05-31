import { Link } from "wouter";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 pt-20">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <h1 className="text-[12rem] font-black text-white/5 leading-none select-none pointer-events-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle className="w-20 h-20 text-primary" />
            </div>
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-white mb-4">الصفحة غير موجودة</h2>
        <p className="text-muted-foreground mb-10 text-lg">
          يبدو أنك وصلت إلى صفحة غير متوفرة أو تم تغيير مسارها.
          دعنا نعود إلى الصفحة الرئيسية.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
        >
          العودة للرئيسية
          <ArrowRight className="w-5 h-5 rotate-180" />
        </Link>
      </div>
    </div>
  );
}
