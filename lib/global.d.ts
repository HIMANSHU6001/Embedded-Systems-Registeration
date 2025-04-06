declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: mongoose.Connection | null;
        promise: Promise<typeof mongoose> | null;
      };
    }
  }
}

export {};
