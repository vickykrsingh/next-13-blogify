import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("fileuri");
  const utapi = new UTApi();
  try {
    if (search) {
      const uploadThingDeleteRes = await utapi.deleteFiles(search);
      return NextResponse.json({
        data: uploadThingDeleteRes,
        success: true,
        message: "deleted successfully",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      data: null,
      success: false,
      message: "Uploadthing delete failed.",
    });
  }
}
