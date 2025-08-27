from __future__ import annotations

"""User model and helper methods.

This module provides a small wrapper around the ``users`` table using
SQLAlchemy.  The original file accidentally contained configuration code for a
MongoDB connection, which meant that :class:`AuthService` could not import a
``User`` model.  Without a proper model the authentication layer fails during
runtime.  The implementation below defines a minimal SQLAlchemy model together
with helper methods used by ``AuthService`` for registration, look‑up and
password verification.

The password is stored as a SHA256 hash.  While this is not suitable for a
production deployment, it keeps the example self‑contained and avoids
additional dependencies.
"""

from hashlib import sha256
from typing import Dict, Optional

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session

from ..databases import Base, SessionLocal, engine


class User(Base):
    """SQLAlchemy model representing a user."""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(256))

    # ------------------------------------------------------------------
    # Helper methods
    # ------------------------------------------------------------------
    @staticmethod
    def _hash_password(password: str) -> str:
        """Return a SHA256 hash of ``password``."""

        return sha256(password.encode("utf-8")).hexdigest()

    @classmethod
    def create_user(cls, name: str, email: str, password: str) -> Dict[str, str]:
        """Create a new user and return its data as a dict."""

        db: Session = SessionLocal()
        try:
            user = cls(name=name, email=email, password=cls._hash_password(password))
            db.add(user)
            db.commit()
            db.refresh(user)
            return {"id": user.id, "name": user.name, "email": user.email, "password": user.password}
        finally:
            db.close()

    @classmethod
    def find_user_by_email(cls, email: str) -> Optional[Dict[str, str]]:
        """Return a user dict matching ``email`` or ``None``."""

        db: Session = SessionLocal()
        try:
            user = db.query(cls).filter_by(email=email).first()
            if user is None:
                return None
            return {"id": user.id, "name": user.name, "email": user.email, "password": user.password}
        finally:
            db.close()

    @classmethod
    def verify_password(cls, user: Dict[str, str], password: str) -> bool:
        """Check whether ``password`` matches ``user``'s stored hash."""

        return user["password"] == cls._hash_password(password)


# Ensure the table exists when this module is imported.
Base.metadata.create_all(bind=engine)

